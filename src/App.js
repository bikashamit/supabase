import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
const supabaseUrl = 'https://ldyjihpggrptzhxdsghv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeWppaHBnZ3JwdHpoeGRzZ2h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc1MzgwNjEsImV4cCI6MjAwMzExNDA2MX0.lwZ2KFNEnIDWacDva_0nlS5B07c3BYB0Qxee6pdC04M';

export const supabase = createClient(supabaseUrl, supabaseKey);


function App() {
  const [todos, setTodos] = useState([]);
  const videoUrl = 'https://ldyjihpggrptzhxdsghv.supabase.co/storage/v1/object/public/test/2020-04-23-140008407.mp4?t=2023-08-12T05%3A24%3A21.201Z'; // Replace with your video's path
  const videoSource = `${supabase.storageUrl}/${videoUrl}`;

  useEffect(() => {
    //fetching data from database
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
    //bucket explore

  }, []);

  return (
    <div className="App">
      <h1>Supabase Realtime App</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
      <div>
        <div>
          <h1>Video Player</h1>
          <video controls width="600" height="400">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default App;
