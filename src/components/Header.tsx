import React, { useEffect, useState } from 'react';

type Props = { onAdd: (title: string) => Promise<void> };

export const Header: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [disabled, setDisabled] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [disabled]); // Фокус після розблокування

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    setDisabled(true);
    try {
      await onAdd(title);
      setTitle('');
    } catch {
    } finally {
      setDisabled(false);
    }
  };

  return (
    <header className="todoapp__header">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          disabled={disabled}
          value={title}
          onChange={e => setTitle(e.target.value)}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
