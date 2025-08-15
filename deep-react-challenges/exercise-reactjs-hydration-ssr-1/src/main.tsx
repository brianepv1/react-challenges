import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import type { User } from './types/interface.ts';
import UserProfile from './types/components/UserProfile.tsx';

const rootElement = document.getElementById('root');

const initialState = (window as any).__INITIAL_DATA__ as User;

if(rootElement){
  hydrateRoot(
    rootElement, 
    <StrictMode>
      <UserProfile user={initialState}></UserProfile>
    </StrictMode>
  )
}