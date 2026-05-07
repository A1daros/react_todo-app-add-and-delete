/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotificaton';
import { FilterStatus } from './types/types';
import { useErrorMessage } from './hooks/useErrorMessage';
import { useTodos } from './hooks/useTodos';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
  const [error, setError] = useErrorMessage();

  const { todos, tempTodo, deletingId, addTodo, removeTodo, clearCompleted } =
    useTodos(setError);

  const visibleTodos = todos.filter(todo => {
    if (filter === FilterStatus.Active) {
      return !todo.completed;
    }

    if (filter === FilterStatus.Completed) {
      return todo.completed;
    }

    return true;
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          onAdd={addTodo}
          onError={setError}
          loading={!!tempTodo || deletingId.length > 0}
        />

        {(todos.length > 0 || tempTodo) && (
          <TodoList
            todos={visibleTodos}
            tempTodo={tempTodo}
            deletingId={deletingId}
            onDelete={removeTodo}
          />
        )}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>

      <ErrorNotification error={error} onErrorClose={() => setError(null)} />
    </div>
  );
};
