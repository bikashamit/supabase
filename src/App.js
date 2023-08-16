import './index.css'

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


const api_url=process.env.SUPABASE_API_URL;
const bearer_key=process.SUPABASE_BEARER_KEY
const supabase = createClient(api_url,bearer_key);


export default function App() {
  const [session, setSession] = useState(null)
const [todos, setTodos] = useState([]);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
     
    })
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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])
  const  handleClick=()=> {
    const signOutfunction=async ()=>{
      const { error } = await supabase.auth.signOut()
    }
    signOutfunction()
  }

  if (!session) {
    return (
      <div>
      <h1>Supabase Realtime App</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
      )
  }
  
   return (
    <div className="App">
      <h1>Supabase Realtime App</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
      <a onClick={handleClick}>signout</a>
    </div>
  );
}
