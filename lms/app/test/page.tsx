const test = () => {
    // added publicRoutes: ['/test'] in middleware.ts for unprotecting this route
    return ( <p>this is unprotected route</p> );
}
 
export default test;