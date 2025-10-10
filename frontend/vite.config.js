import { defineConfig } from 'vite'
//first "npm intall fs" this is so that we can loaf things from our certs folder
import fs from 'fs'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //we then set the server
  server: {
    //https settings
    https: {
      //and pass our private kep, and certificate files (like the backend)
      key: fs.readFileSync('./certs/localhost+1-key.pem'),
      cert: fs.readFileSync('./certs/localhost+1.pem'),
    }
  }
})
