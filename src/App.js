import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
const supabaseUrl = 'https://ldyjihpggrptzhxdsghv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeWppaHBnZ3JwdHpoeGRzZ2h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc1MzgwNjEsImV4cCI6MjAwMzExNDA2MX0.lwZ2KFNEnIDWacDva_0nlS5B07c3BYB0Qxee6pdC04M';

export const supabase = createClient(supabaseUrl, supabaseKey);


function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data, error } = await supabase.from('todos').select('*');
        if (error) {
          throw error;
        }
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error.message);
      }
    };

    fetchTodos();

    const todosSubscription = supabase.channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'todos' },
      (payload) => {
        console.log('Change received!', payload)
      }
    )
    .subscribe()

    return () => {
      todosSubscription.unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <h1>Supabase Realtime App</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
