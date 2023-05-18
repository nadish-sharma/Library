export const SearchFilterItems = [
    {
        title : "library:",
<<<<<<< HEAD
        urlStart1 : "",
        urlStart2:"http://localhost:8080/api/book/",
        filterLink1: "",
        filterLink2: null,
        description: "search library catalogue",
        cName : "search-links",
        filterNumber: 1
        // icon : "fa-solid fa-house-user"
        
    },
    {
        title : "online:",
        urlStart1 : "https://www.googleapis.com/books/v1/volumes?q=",
        urlStart2:"",
        filterLink1: "&filter=ebooks&maxResults=12",
        filterLink2: null,
        description: "search online",
        cName : "search-links",
        filterNumber: 2
=======
        url : "https://www.googleapis.com/books/v1/volumes?q=",
        description: "search library catalogue",
        cName : "search-links",
        // icon : "fa-solid fa-house-user"
    },
    {
        title : "online:",
        url : "http://localhost:8080/api/book/",
        description: "search online",
        cName : "search-links",
>>>>>>> dde8b8ac7aaef29180a3a05d85e342cbfd5a4526
        // icon : "fa-solid fa-circle-info"
    },
    {
        title : "free:",
<<<<<<< HEAD
        urlStart1 : "https://www.googleapis.com/books/v1/volumes?q=",
        urlStart2:"",
        filterLink1: "&filter=free-ebooks&maxResults=12",
        filterLink2: null,
        description: "search free e-books",
        cName : "search-links",
        filterNumber: 3
        // icon : "fa-solid fa-briefcase"
    },
    {
        title : "all library:",
        urlStart1 : "",
        urlStart2:"http://localhost:8080/api/book",
        filterLink1: "",
        filterLink2: null,
        description: "get all books in library",
        cName : "search-links",
        filterNumber: 4
        // icon : "fa-solid fa-house-user"
        
    },
    {
        title : "everywhere:",
        urlStart1 : "https://www.googleapis.com/books/v1/volumes?q=",
        urlStart2 : "http://localhost:8080/api/book/",
        filterLink1: "&filter=ebooks&maxResults=12",
        filterLink2: "",
        description: "search books in library and online",
        cName : "search-links",
        filterNumber: 5
        // icon : "fa-solid fa-house-user"
        
    },
    {
        title : "everywhere free:",
        urlStart1 : "https://www.googleapis.com/books/v1/volumes?q=",
        urlStart2 : "http://localhost:8080/api/book/",
        filterLink1: "&filter=free-ebooks&maxResults=12",
        filterLink2: "",
        description: "search for free books in library and online",
        cName : "search-links",
        filterNumber: 6
        // icon : "fa-solid fa-house-user"
        
=======
        url : "/updateUser",
        description: "search free e-books",
        cName : "search-links",
        // icon : "fa-solid fa-briefcase"
>>>>>>> dde8b8ac7aaef29180a3a05d85e342cbfd5a4526
    }
]