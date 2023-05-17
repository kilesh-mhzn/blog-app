export const postValidation = (post) => {
    let errors = {};
    if(!post.title) errors.title = "Title is required";
    if(post.title.length < 5){
        errors.title = "Title must be at least 5 characters long";
    }
    if(post.content.length < 5){
        errors.content = "Content must be at least 5 characters long";
    }
    // if(post.tags.length < 3){
    //     errors.tags = "Tags must be at least 3 characters long";
    // }
    return errors;
}

export const authValidation = (user, isLogin) =>{
    let errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!isLogin){
        if(!user.firstName){
            errors.firstName = "First Name is required"
        }
        if(!user.lastName){
            errors.lastName = "Last Name is required"
        }
        if(!user.confirmPassword){
            errors.confirmPassword = "Confirm Password is required"
        }
        else if(user.password !== user.confirmPassword){
            errors.confirmPassword = "Password and Confirm Password must be same"
        }
    }
    if(!user.email){
        errors.email = "Email is required"
    }
    else if(!regex.test(user.email)){
        errors.email = "Email is not valid"
    }
    if(!user.password){
        errors.password = "Password is required"
    }

    return errors
}