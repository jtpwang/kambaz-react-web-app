export const users = [
    {
        _id: "1",
        username: "alice",
        password: "alice123",
        firstName: "Alice",
        lastName: "Wonder",
        dob: "1990-01-01",
        email: "alice@example.com",
        role: "FACULTY"
    },
    {
        _id: "2",
        username: "bob",
        password: "bob123",
        firstName: "Bob",
        lastName: "Smith",
        dob: "1985-05-15",
        email: "bob@example.com",
        role: "STUDENT"
    },
    {
        _id: "3",
        username: "charlie",
        password: "charlie123",
        firstName: "Charlie",
        lastName: "Brown",
        dob: "1992-12-10",
        email: "charlie@example.com",
        role: "STUDENT"
    },

    {
        "_id": "123",
        "username": "iron_man",
        "password": "stark123",
        "firstName": "Tony",
        "lastName": "Stark",
        "email": "tony@stark.com",
        "dob": "1970-05-29T00:00:00.000Z",
        "role": "FACULTY",
        "loginId": "001234561S",
        "section": "S101",
        "lastActivity": "2020-10-01",
        "totalActivity": "10:21:32"
    },
    {
        "_id": "234",
        "username": "dark_knight",
        "password": "wayne123",
        "firstName": "Bruce",
        "lastName": "Wayne",
        "email": "bruce@wayne.com",
        "dob": "1972-02-19",
        "role": "STUDENT",
        "loginId": "001234562S",
        "section": "S101",
        "lastActivity": "2020-11-02",
        "totalActivity": "15:32:43"
    },
    {
        "_id": "345",
        "username": "black_widow",
        "password": "romanoff123",
        "firstName": "Natasha",
        "lastName": "Romanoff",
        "email": "natasha@avengers.com",
        "dob": "1984-11-22",
        "role": "TA",
        "loginId": "001234564S",
        "section": "S101",
        "lastActivity": "2020-11-05",
        "totalActivity": "13:23:34"
    },
    {
        "_id": "456",
        "username": "thor_odinson",
        "password": "mjolnir123",
        "firstName": "Thor",
        "lastName": "Odinson",
        "email": "thor@asgard.com",
        "dob": "982-05-25",
        "role": "STUDENT",
        "loginId": "001234565S",
        "section": "S101",
        "lastActivity": "2020-12-01",
        "totalActivity": "11:22:33"
    },
    {
        "_id": "567",
        "username": "hulk_smash",
        "password": "banner123",
        "firstName": "Bruce",
        "lastName": "Banner",
        "email": "bruce@avengers.com",
        "dob": "1969-12-18",
        "role": "STUDENT",
        "loginId": "001234566S",
        "section": "S101",
        "lastActivity": "2020-12-01",
        "totalActivity": "22:33:44"
    },
    {
        "_id": "678",
        "username": "ring_bearer",
        "password": "shire123",
        "firstName": "Frodo",
        "lastName": "Baggins",
        "email": "frodo@shire.com",
        "dob": "1368-09-22",
        "role": "FACULTY",
        "loginId": "001234567S",
        "section": "S101",
        "lastActivity": "2020-12-02",
        "totalActivity": "44:33:22"
    },
    {
        "_id": "789",
        "username": "strider",
        "password": "aragorn123",
        "firstName": "Aragorn",
        "lastName": "Elessar",
        "email": "aragorn@gondor.com",
        "dob": "2931-03-01",
        "role": "TA",
        "loginId": "001234568S",
        "section": "S101",
        "lastActivity": "2020-12-04",
        "totalActivity": "12:23:34"
    },
    {
        "_id": "890",
        "username": "elf_archer",
        "password": "legolas123",
        "firstName": "Legolas",
        "lastName": "Greenleaf",
        "email": "legolas@mirkwood.com",
        "dob": "2879-07-15",
        "role": "STUDENT",
        "loginId": "001234569S",
        "section": "S101",
        "lastActivity": "2020-11-11",
        "totalActivity": "21:32:43"
    },
    {
        "_id": "777",
        "username": "ada",
        "password": "123",
        "firstName": "Ada",
        "lastName": "Lovelace",
        "email": "ada@lovelace.com",
        "dob": "1815-12-15",
        "role": "ADMIN",
        "loginId": "002143650S",
        "section": "S101",
        "lastActivity": "1852-11-27",
        "totalActivity": "21:32:43"
    }


];

export const courses = [

    {
        "_id": "RS101",
        "name": "Rocket Propulsion",
        "number": "RS4550",
        "startDate": "2023-01-10",
        "endDate": "2023-05-15",
        "department": "D123",
        "credits": 4,
        "image": "/images/rocket.jpg",
        "description": "This course provides an in-depth study of the fundamentals of rocket propulsion, covering topics such as propulsion theory, engine types, fuel chemistry, and the practical applications of rocket technology. Designed for students with a strong background in physics and engineering, the course includes both theoretical instruction and hands-on laboratory work"
    },
    {
        "_id": "RS102",
        "name": "Aerodynamics",
        "number": "RS4560",
        "startDate": "2023-01-10",
        "endDate": "2023-05-15",
        "department": "D123",
        "credits": 3,
        "image": "/images/aero.jpg",
        "description": "This course offers a comprehensive exploration of aerodynamics, focusing on the principles and applications of airflow and its effects on flying objects. Topics include fluid dynamics, airfoil design, lift and drag forces, and the aerodynamic considerations in aircraft design. The course blends theoretical learning with practical applications, suitable for students pursuing a career in aeronautics or astronautics engineering."
    },
    {
        "_id": "RS103",
        "name": "Spacecraft Design",
        "number": "RS4570",
        "startDate": "2023-01-10",
        "endDate": "2023-05-15",
        "department": "D123",
        "credits": 4,
        "image": "/images/spacecraft.jpg",
        "description": "This course delves into the principles and practices of spacecraft design, offering students a detailed understanding of the engineering and technology behind spacecraft systems. Key topics include spacecraft structure, propulsion, power systems, thermal control, and payload integration. Emphasizing both theoretical concepts and practical skills, the course prepares students for careers in the space industry, with a focus on innovative design and problem-solving in the context of current and future space missions"
    },
    {
        "_id": "RS104",
        "name": "Organic Chemistry",
        "number": "CH1230",
        "startDate": "2023-01-10",
        "endDate": "2023-05-15",
        "department": "D134",
        "credits": 3,
        "image": "/images/orgo.jpg",
        "description": "Organic Chemistry is an in-depth course that explores the structure, properties, composition, and reactions of organic compounds and materials. The course covers various topics including hydrocarbons, functional groups, stereochemistry, and organic synthesis techniques. Students will learn about the mechanisms of organic reactions, spectroscopic methods for structure determination, and the role of organic chemistry in biological systems. Emphasis is placed on problem-solving and laboratory skills, preparing students for advanced studies in chemistry, medicine, and related fields."
    },
    {
        "_id": "RS105",
        "name": "Inorganic Chemistry",
        "number": "CH1240",
        "startDate": "2023-01-10",
        "endDate": "2023-05-15",
        "department": "D134",
        "credits": 3,
        "image": "/images/orgo.jpg",
        "description": "Inorganic Chemistry focuses on the properties, structures, and behaviors of inorganic and organometallic compounds. This course covers a range of topics including coordination chemistry, metal complexes, bonding theories, symmetry, and crystal field theory. Students will also explore the role of inorganic chemistry in real-world applications such as catalysis, materials science, and bioinorganic processes. Laboratory work emphasizes synthesis and analysis of inorganic compounds, fostering a deeper understanding of theoretical concepts."
    },
    {
        "_id": "RS106",
        "name": "Physical Chemistry",
        "number": "CH1250",
        "startDate": "2023-01-10",
        "endDate": "2023-05-15",
        "department": "D134",
        "credits": 3,
        "image": "/images/orgo.jpg",
        "description": "Physical Chemistry merges the principles of physics and chemistry to understand the physical properties of molecules, the forces that act upon them, and the chemical reactions they undergo. Key topics include thermodynamics, kinetics, quantum mechanics, and spectroscopy. The course provides a comprehensive understanding of molecular behavior, reaction dynamics, and the application of mathematical methods in solving chemical problems. Labs focus on experimental techniques and data analysis, equipping students with skills necessary for research and advanced study in chemistry and related fields."
    },
    {
        "_id": "RS107",
        "name": "Ancient Languages and Scripts of Middle-earth",
        "number": "ME101",
        "startDate": "2023-01-10",
        "endDate": "2023-05-15",
        "department": "Languages",
        "credits": 3,
        "image": "/images/ancient.jpg",
        "description": "This course offers an exploration of the ancient languages and scripts found throughout Middle-earth, including Elvish (Sindarin and Quenya), Dwarvish (Khuzdul), and the Black Speech of Mordor. Students will learn the historical and cultural contexts of these languages, their linguistic structures, and their usage in various inscriptions and texts. Emphasis is on understanding the philological aspects and the role of language in shaping Middle-earth's history and lore.",
        "author": "654f9ec2ea7ead465908d1e3"
    },
    {
        "_id": "RS108",
        "name": "Wizards, Elves, and Men: Inter-species Diplomacy in Middle-earth",
        "number": "ME102",
        "startDate": "2023-01-10",
        "endDate": "2023-05-15",
        "department": "Political Studies",
        "credits": 4,
        "image": "/images/midearth.jpg",
        "description": "This course explores the complex relationships and diplomatic interactions among the different races of Middle-earth: Elves, Men, Dwarves, and Wizards. Topics include the study of historical alliances, conflicts, and the role of leadership and wisdom in maintaining peace. Students will engage in discussions and case studies on key events in Middle-earth's history, such as the Council of Elrond and the War of the Ring, to understand the principles of diplomacy and conflict resolution in a multi-species context.",
        "author": "654f9ec2ea7ead465908d1e3"
    }

];

export const enrollments = [
    {
        "_id": "1",
        "user": "123",
        "course": "RS101"
    },
    {
        "_id": "2",
        "user": "234",
        "course": "RS101"
    },
    {
        "_id": "3",
        "user": "345",
        "course": "RS101"
    },
    {
        "_id": "4",
        "user": "456",
        "course": "RS101"
    },
    {
        "_id": "5",
        "user": "567",
        "course": "RS101"
    },
    {
        "_id": "6",
        "user": "234",
        "course": "RS102"
    },
    {
        "_id": "7",
        "user": "789",
        "course": "RS102"
    },
    {
        "_id": "8",
        "user": "890",
        "course": "RS102"
    },
    {
        "_id": "9",
        "user": "123",
        "course": "RS102"
    }
];

export const modules = [
    {
        _id: "1",
        name: "Introduction to HTML",
        course: "1",
        lessons: [
            { _id: "101", name: "HTML Basics", description: "Learn HTML fundamentals" },
            { _id: "102", name: "HTML Forms", description: "Create interactive forms" }
        ]
    },
    {
        _id: "2",
        name: "Introduction to CSS",
        course: "1",
        lessons: [
            { _id: "201", name: "CSS Basics", description: "Learn CSS fundamentals" },
            { _id: "202", name: "CSS Layout", description: "Create responsive layouts" }
        ]
    },
    {
        _id: "3",
        name: "Introduction to JavaScript",
        course: "1",
        lessons: [
            { _id: "301", name: "JavaScript Basics", description: "Learn JavaScript fundamentals" },
            { _id: "302", name: "DOM Manipulation", description: "Interact with the DOM" }
        ]
    },
    {
        _id: "4",
        name: "React Fundamentals",
        course: "2",
        lessons: [
            { _id: "401", name: "React Components", description: "Learn about React components" },
            { _id: "402", name: "React Props", description: "Understand React props" }
        ]
    },
    {
        _id: "5",
        name: "React Hooks",
        course: "2",
        lessons: [
            { _id: "501", name: "useState", description: "Manage state with useState" },
            { _id: "502", name: "useEffect", description: "Handle side effects with useEffect" }
        ]
    },

    {
        "_id": "M101",
        "name": "Introduction to Rocket Propulsion",
        "description": "Basic principles of rocket propulsion and rocket engines.",
        "course": "RS101",
        "lessons": [
            {
                "_id": "L101",
                "name": "History of Rocketry",
                "description": "A brief history of rocketry and space exploration.",
                "module": "M101"
            },
            {
                "_id": "L102",
                "name": "Rocket Propulsion Fundamentals",
                "description": "Basic principles of rocket propulsion.",
                "module": "M101"
            },
            {
                "_id": "L103",
                "name": "Rocket Engine Types",
                "description": "Overview of different types of rocket engines.",
                "module": "M101"
            }
        ]
    },
    {
        "_id": "M102",
        "name": "Fuel and Combustion",
        "description": "Understanding rocket fuel, combustion processes, and efficiency.",
        "course": "RS101",
        "lessons": [
            {
                "_id": "L201",
                "name": "Rocket Fuel",
                "description": "Overview of different types of rocket fuels.",
                "module": "M102"
            },
            {
                "_id": "L202",
                "name": "Combustion Processes",
                "description": "Understanding combustion processes and efficiency.",
                "module": "M102"
            },
            {
                "_id": "L203",
                "name": "Combustion Instability",
                "description": "Understanding combustion instability and mitigation.",
                "module": "M102"
            }
        ]
    },
    {
        "_id": "M103",
        "name": "Nozzle Design",
        "description": "Principles of rocket nozzle design and performance optimization.",
        "course": "RS101",
        "lessons": [
            {
                "_id": "L301",
                "name": "Nozzle Design",
                "description": "Overview of different types of rocket nozzles.",
                "module": "M103"
            },
            {
                "_id": "L302",
                "name": "Nozzle Performance",
                "description": "Understanding nozzle performance and efficiency.",
                "module": "M103"
            },
            {
                "_id": "L303",
                "name": "Nozzle Optimization",
                "description": "Optimizing nozzle design for specific applications.",
                "module": "M103"
            }
        ]
    },
    {
        "_id": "M201",
        "name": "Fundamentals of Aerodynamics",
        "description": "Basic aerodynamic concepts and fluid dynamics principles.",
        "course": "RS102",
        "lessons": [
            {
                "_id": "L401",
                "name": "Aerodynamics Basics",
                "description": "Overview of different principles of aerodynamics",
                "module": "M201"
            },
            {
                "_id": "L402",
                "name": "Fluid Dynamics",
                "description": "Introduction to the mechanics of fluids",
                "module": "M201"
            }
        ]
    },
    {
        "_id": "M202",
        "name": "Subsonic and Supersonic Flow",
        "description": "Understanding subsonic and supersonic aerodynamic behaviors.",
        "course": "RS102",
        "lessons": [
            {
                "_id": "L501",
                "name": "Subsonic Flow",
                "description": "Overview of subsonic aerodynamic behaviors",
                "module": "M202"
            },
            {
                "_id": "L502",
                "name": "Supersonic Flow",
                "description": "Overview of supersonic aerodynamic behaviors",
                "module": "M202"
            }
        ]
    },
    {
        "_id": "M203",
        "name": "Aerodynamic Heating",
        "description": "Study of aerodynamic heating and thermal protection systems.",
        "course": "RS102"
    },
    {
        "_id": "M301",
        "name": "Spacecraft Structural Design",
        "description": "Fundamentals of designing spacecraft structures and materials selection.",
        "course": "RS103"
    },
    {
        "_id": "M302",
        "name": "Orbital Mechanics",
        "description": "Understanding orbital dynamics and mission planning.",
        "course": "RS103"
    },
    {
        "_id": "M303",
        "name": "Spacecraft Systems Engineering",
        "description": "Overview of spacecraft systems and subsystems engineering.",
        "course": "RS103"
    }
];

export const assignments = [
    {
        "_id": "A101",
        "title": "Propulsion Assignment",
        "description": "This is an assignment",
        "course": "RS101",
        "availableFrom": "2024-05-06",
        "availableUntil": "2024-05-13",
        "due": "2024-05-13",
        "points": 100
    },
    {
        "_id": "A102",
        "title": "Combustion Analysis",
        "description": "This is an assignment",
        "course": "RS101",
        "availableFrom": "2024-05-13",
        "availableUntil": "2024-05-20",
        "due": "2024-05-20",
        "points": 100
    },
    {
        "_id": "A103",
        "title": "Nozzle Design Project",
        "description": "This is an assignment",
        "course": "RS101",
        "availableFrom": "2024-05-20",
        "availableUntil": "2024-05-27",
        "due": "2024-05-27",
        "points": 100
    },
    {
        "_id": "A201",
        "title": "Aerodynamics Quiz",
        "description": "This is an assignment",
        "course": "RS102",
        "availableFrom": "2024-05-06",
        "availableUntil": "2024-05-13",
        "due": "2024-05-13",
        "points": 100
    },
    {
        "_id": "A202",
        "title": "Flow Analysis",
        "description": "This is an assignment",
        "course": "RS102",
        "availableFrom": "2024-05-13",
        "availableUntil": "2024-05-20",
        "due": "2024-05-20",
        "points": 100
    },
    {
        "_id": "A203",
        "title": "Heating Analysis",
        "description": "This is an assignment",
        "course": "RS102",
        "availableFrom": "2024-05-20",
        "availableUntil": "2024-05-27",
        "due": "2024-05-27",
        "points": 100
    },
    {
        "_id": "A301",
        "title": "Structural Design Task",
        "description": "This is an assignment",
        "course": "RS103",
        "availableFrom": "2024-05-06",
        "availableUntil": "2024-05-13",
        "due": "2024-05-13",
        "points": 100
    },
    {
        "_id": "A302",
        "title": "Orbital Calculations",
        "description": "This is an assignment",
        "course": "RS103",
        "availableFrom": "2024-05-13",
        "availableUntil": "2024-05-20",
        "due": "2024-05-20",
        "points": 100
    },
    {
        "_id": "A303",
        "title": "Systems Engineering Exam",
        "description": "This is an assignment",
        "course": "RS103",
        "availableFrom": "2024-05-20",
        "availableUntil": "2024-05-27",
        "due": "2024-05-27",
        "points": 100
    }
];
