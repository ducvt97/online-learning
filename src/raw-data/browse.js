const BrowseData = [
    {
        title: "Popular Skills",
        data: [
            {
                type: 1,
                data: {
                    skills: ["Angular", "JavaScript", "C#", "Java", "VueJS"],
                    topics: ["Conferences", "<Software>", "Bussiness", "Creative", "IT", "Design",
                    "Security", "Architecture", "Data", "Certification"]
                }
            }
        ]
    },
    {
        title: "Paths",
        data: [{
            type: 2,
            data: [
                {
                    title: "ReactJS",
                    course: 6,
                    imageSrc: "../../assets/react.png"
                },
                {
                    title: "React Native",
                    course: 5,
                    imageSrc: "../../assets/react.png"
                },
                {
                    title: "React Redux",
                    course: 10,
                    imageSrc: "../../assets/react.png"
                },
                {
                    title: "React Native Elements",
                    course: 6,
                    imageSrc: "../../assets/react.png"
                }
            ]
        }]
    },
    {
        title: "Top Authors",
        data: [{
            type: 3,
            data: ["Simon", "Debora", "Scott", "Samer", "Jim", "Wilson"]
        }]
    }
]

export default BrowseData;