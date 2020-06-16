import { coursesData } from "./courses";

export const pathsData = [
    {
        id: 1,
        title: "Angular",
        numberOfCourses: 14,
        duration: "53 hours",
        description: "Angular is a complete JavaScript framework for creating dynamic and interactive applications in HTML. Aside from " +
            "being one of the hottest frameworks on the web, Angular is easy to learn yet powerful enough to help you develop complex " +
            "single-page web applications. This path includes content covering Angular 2 and beyond. For the original version, see " +
            "our AngularJS path.\n\n" + "What you will learn:\n\n" + "Angular core concepts\n" + "Angular CLI\n" + "Forms\n" +
            "Components\n" + "Routing\n" + "Services\n" + "Dependency injection\n" + "Unit testing\n" + "Advanced workflows\n",
        courses: {
            beginner: coursesData,
            intermediate: coursesData,
            advanced: coursesData
        }
    },
    {
        id: 2,
        title: "React",
        numberOfCourses: 12,
        duration: "42 hours",
        description: "React is a JavaScript library, developed in 2013 by Jordan Walke of Facebook. You'll find React is both very " +
            "popular (it's the 5th most starred JS library on Github) and used on major sites including Facebook, Netflix, and Khan " +
            "Academy. You'll love the flexibility of using React with your favorite web technologies (except for jQuery!), and this " +
            "path will take you from the fundamentals all the way up to building full apps with custom styling.\n\n" +
            "What you will learn\n\n" + "Component state\n" + "Props object\n" + "JSX\n" + "Component lifecycle\n" +
            "Events and event binding\n" + "React forms\n" + "Performace enhancements\n" + "Styling\n",
        courses: {
            beginner: coursesData,
            intermediate: coursesData,
            advanced: coursesData
        }
    },
    {
        id: 3,
        title: "Node.js",
        numberOfCourses: 11,
        duration: "31 hours",
        description: "Node.js is a JavaScript runtime that uses a non-blocking I/O model that makes it lightweight, efficient and " +
            "very popular among JavaScript developers who also need to write server-side code. If you need any proof that Node.js " +
            "can help scale your application, look no further than examples like Netflix, Paypal and Uber, which are currently using " +
            "Node.js to deliver fast, scalable and reliable solutions.\n\n" + "What you will learn\n\n" +
            "Strategies for writing asynchronous code\n" + "EventEmitters and Streams\n" + "Real time intergration with Soket.IO\n" + 
            "Using Express.js\n" + "Data access in Node.js\n" + "Building APIs with Node.js\n" + "Modular JavaScript\n" +
            "Performance tips\n" + "Testing\n" + "Common tools, patterns, and best practices\n",
        courses: {
            beginner: coursesData,
            intermediate: coursesData,
            advanced: coursesData
        }
    },
]