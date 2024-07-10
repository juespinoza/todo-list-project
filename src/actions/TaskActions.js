export const getTasks = async (userEmail) => {
    const uri = `http://localhost:3001/api/tasks?userEmail=${userEmail}`;
    const getOptions = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        },
    }
    const response = await fetch(uri, getOptions);
    const data = response.json();
    console.log("getTasks:", data);
    return data;
}

export const getDoneTasks = async (userEmail) => {
    const uri = `http://localhost:3001/api/tasks?userEmail=${userEmail}&done=true`;
    const getOptions = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        },
    }
    const response = await fetch(uri, getOptions);
    const data = response.json();
    console.log(data);
    return data;
}