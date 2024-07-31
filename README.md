# Code Exercise

This project contains the implementation of the Football World Cup Score Board exercises. It allows users to start games, update scores, and mark games as finished. The app provides a summary of finished matches and their scores.

This project was build with [Vite](https://vitejs.dev/)

### Using NPM

- Run `npm install` to install the project dependencies
- Run `npm run dev` to execute the project and see the webpage

### Project structure

The project code contains the folder `src` where we have the files about the main page (App.tsx) and the folder `__tests__`, this last folder has the tests about the exercise.

```
├── src
│   │
│   ├── __tests__
│   │   ├── App.spec.tsx # File with the test structure
│   │
│   ├── App.module.css   # File with css definitions.
│   ├── App.tsx          # File with the design and some logic structure for the exercise.
│   ├── global.css       # File with global css definitions.
│   ├── main.jsx         # File with the structer to call the file App.tsx and execute our webpage.
│
├── package.json
├── vite.config.js       # Vite file
├── index.html           # Html file where we have the id root for calling the main.jsx
└── .gitignore
```

### Conclusion

This project was developed with an emphasis on simplicity, quality, and adherence to specified guidelines. To ensure high quality, I choose to use the React framework along with Vite, instead of creating the code using vanilla JavaScript, because this enables me to use the concept of Test-Driven Development (TDD) throughout the development process.
