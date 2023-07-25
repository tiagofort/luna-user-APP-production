let required = (propertyType, customErrorMessage) => { 
    return v => v && v.length > 0 || customErrorMessage || `You must input a/an ${propertyType}`
  }
  let minLength = (propertyType, minLength) => {
    return v => {
      if(!v){ return true; }
  
      return v.length >= minLength || `${propertyType} must be at least ${minLength} characters`;
    }
  }
  let maxLength = (propertyType, maxLength) => {
    return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters`
  }
  
  let emailFormat = () => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/
    return v => v && regex.test(v) || "Must be a valid email"
  }

  let passwordEqual = (password, passwordVerify) => {
    return v => v && password == passwordVerify || `Password confirm is not equal password`
  }

  let imageSize = (img) => {
    return v => !v || img.value.size < 2000 || 'Avatar size should be less than 2 MB!'
  }
  
  export default {
    required,
    minLength,
    maxLength,
    emailFormat,
    passwordEqual,
    imageSize
  }