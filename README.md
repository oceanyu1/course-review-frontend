<a id="readme-top"></a>

<br />
<div align="center">

  <h3 align="center">RavensRate</h3>

  <p align="center">
    RavensRate is a course review platform where Carleton University students can browse, review, and rate courses. This repo includes only the backend, you can access the backend <a href="https://github.com/oceanyu1/course-review-backend">here</a>. It provides secure authentication, RESTful endpoints, and PostgreSQL integration to support the full review lifecycle from browsing courses to submitting feedback. View the live site <a href="https://ravensrate.ca"><strong>here.</strong></a>
    <br />
    <a href="https://github.com/oceanyu1/course-review-frontend"><strong>Explore the project »</strong></a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

I've always used RateMyProf for when I wanted to take courses, to see what professors were good or bad and help plan my semesters. But when I wanted to see the
difficulty of a course or how heavy the workload was, I always had to look through Reddit or search on Google, and a lot of the time it wasn't very reliable.

This is why I made RavensRate; to be able to plan your courses and see past advice given by upper year students or alumni. I scraped all the courses from Carleton's
course list, and a Carleton email is required to submit a review.

The frontend includes:
* **Modern UI/UX**: Built with React, TypeScript, and Tailwind CSS for a responsive and intuitive interface.
* **Course Discovery**: Browse and search through all Carleton University courses with filtering and sorting capabilities.
* **Review Interface**: Clean, user-friendly forms for submitting and viewing course reviews with ratings.
* **Authentication Flow**: Integrated JWT-based authentication with protected routes for review submission.
* **Radix UI Components**: Accessible, customizable components for forms, modals, and interactive elements.

### Built With
* [![React][React.js]][React-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Vite][Vite]][Vite-url]
* [![TailwindCSS][TailwindCSS]][Tailwind-url]
* [![Vercel][Vercel]][Vercel-url]

<!-- GETTING STARTED -->
### Installation

_Below are instructions on how to install the project and get it running locally. Note that the project will run on port 5173._

1. Clone the repo
   
   ```sh
   git clone https://github.com/oceanyu1/course-review-frontend.git
   ```
2. Install dependencies
   
   ```sh
   npm install
   ```
3. Create a `.env.local` file in the project root for local development
   
   ```sh
   VITE_API_URL=http://localhost:8080/api
   ```
   
   _Note: The production environment uses `VITE_API_URL=https://course-review-backend-zfb1.onrender.com/api` which is already configured in `.env.production`_
4. Start the development server
   
   ```sh
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact

Ocean - [@oceanyu1](https://github.com/oceanyu1)

Project Link: [https://github.com/oceanyu1/course-review-frontend](https://github.com/oceanyu1/course-review-frontend)

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [shadcn/ui](https://ui.shadcn.com/)
* [Radix UI](https://www.radix-ui.com/)
* [React Hook Form](https://react-hook-form.com/)
* [Zod](https://zod.dev/)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/

[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/

[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/

[Vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/