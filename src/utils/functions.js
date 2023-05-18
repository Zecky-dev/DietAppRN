import auth from '@react-native-firebase/auth'
import getFirebaseAuthErrorMessage from './firebaseErrorMessage';
import {showMessage} from 'react-native-flash-message';

// CRUD işlemleri

const login = (email,password,setLoading) => {
    
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const validatePassword = (password) => {
        const regex = /^[^\s]{8,16}$/;
        return regex.test(password);
    }

    
    if(validateEmail(email) && validatePassword(password)) {
        setLoading(true);
        auth()
        .signInWithEmailAndPassword(email,password)
        .then(() => {
            setUserLoggedIn(true);
            setLoading(false);
        })
        .catch((err) => {
        showMessage({
            message: getFirebaseAuthErrorMessage(err.code),
            type: "warning",
        })
        setLoading(false);
        });
    }

    else {
        showMessage({
            message: "E-posta veya şifrede hata var.",
            type: "warning"
        })
        setLoading(false);
    }
}



// Enerji ihtiyacı hesabı (Kalori)

const MovementFrequency = {
    'Hareketsiz': 1.2,
    'Az hareketli': 1.375,
    'Orta Derece Hareketli': 1.55,
    'Hareketli': 1.725
}   

// Günlük kalori ihtiyacı hesaplama
const calculateDailyCalorieNeed = (user) => {
    const {gender,height,weight,age,movementFrequency} = user;
    let calorieNeed;
    if(gender === "Erkek") {
        calorieNeed = 66.5 + (13.75 * weight) + ((5 * height) - (6.77 * age))
    }
    if(gender === "Kadın") {
        calorieNeed = 655.1 + (9.56 * weight) + (1.85 * height) - (4.67 * age)
    }
    return calorieNeed * MovementFrequency[movementFrequency];
}

// Günlük karbonhidrat ihtiyacı 
const calculateDailyCarbohydrateNeed = (user) => {
    const {gender,weight,movementFrequency} = user;
    let baseNeed,extraNeed;
    if(gender === "Kadın") {
        baseNeed = calculateDailyCalorieNeed(user) * MovementFrequency[movementFrequency]
        extraNeed = (MovementFrequency[movementFrequency] * 0.8) * weight;
    }
    if(gender === "Erkek") {
        baseNeed = calculateDailyCalorieNeed(user) * MovementFrequency[movementFrequency];
        extraNeed = (MovementFrequency[movementFrequency] * 1.1 ) * weight;
    }
    const totalNeed = baseNeed + extraNeed;
    return totalNeed;
}

// Günlük su ihtiyacı (ml cinsinden)
const calculateDailyWaterNeed = (user) => {
    const {weight,movementFrequency} = user;
    const movementWaterConstants = {
        'Hareketsiz': 35,
        'Az hareketli': 40,
        'Orta derece hareketli': 45,
        'Hareketli': 50,
    }
    return weight * movementWaterConstants[movementFrequency];
}


// Günlük protein ihtiyacı hesabı (gr cinsinden)
const calculateDailyProteinNeed = (user) => {
    const {gender,weight,movementFrequency} = user;
    if(gender === "Erkek") {
        return (weight * 1.2) * MovementFrequency[movementFrequency];
    }
    else {
        return (weight * 0.8) * MovementFrequency[movementFrequency]
    }
}
















// Gerekli vücut hesaplamaları

// Vücut kitle indexi
const calculateBMI = (user) => {
    // Kilo / Boy^2 = BMI
    const heightMeterSquare = Math.pow(user.height / 100, 2);
    const BMI = (user.weight / heightMeterSquare).toFixed(2);
    let BMIDescr = "";
    if (BMI < 18.5) {
        BMIDescr = "Zayıf";
    }
    else if (BMI >= 18.5 && BMI < 24.9) {
        BMIDescr = "Normal Kilolu"
    }
    else if (BMI >= 25 && BMI < 29.9) {
        BMIDescr = "Fazla Kilolu"
    }
    else if (BMI >= 30 && BMI < 34.9) {
        BMIDescr = "1. Derece Obez"
    }
    else if (BMI >= 35 && BMI < 39.9) {
        BMIDescr = "2. Derece Obez"
    }
    else {
        BMIDescr = "3. Derece Obez"
    }
    return { value: BMI, unit: "kg/m²", BMIDescr };
}

// İdeal kilo hesabı
const calculateIdealWeight = (user) => {
    const { height, gender } = user;
    if (gender === null || gender === "Erkek") {
        return { unit: "kg", value: (50 + 2.3 * ((height / 2.54) - 60)).toFixed(2) };
    }
    else {
        return { unit: "kg", value: (45 + 2.3 * ((height / 2.54) - 60)).toFixed(2) };
    }
}

// Verilmesi gereken kilo
const calculateWeightToBeLost = (user) => {
    const controlStatement = user.weight - calculateIdealWeight(user).value > 0
    const value = (
        controlStatement
            ? (user.weight - calculateIdealWeight(user).value).toFixed(2)
            : "--")
    return { unit: (controlStatement?"kg":""), value };
}

//alınması gereken kilo
const calculateWeightToBeGained = (user) => {
    const controlStatement = calculateIdealWeight(user).value - user.weight > 0
    const value = (
        controlStatement
            ? (calculateIdealWeight(user).value - user.weight).toFixed(2)
            : "--"
    )
    return { unit:(controlStatement?"kg":""), value };
}

// Vücut yüzey alanı hesaplama
const calculateBodySurfaceArea = (user) => {
    const { height, weight } = user;
    return { value: Math.sqrt((height * weight) / 3600).toFixed(2), unit: "m²" };
}

// Sağlıklı kilo aralığı hesaplama
const calculateMinMaxWeight = (user) => {
    const { height } = user;
    const min = 18.5 * Math.pow(height / 100, 2);
    const max = 24.9 * Math.pow(height / 100, 2);
    const value = min.toFixed(2).toString().concat(" -- ").concat(max.toFixed(2).toString())
    return { value, unit: 'kg' }
}

export {
    calculateBMI,
    calculateIdealWeight,
    calculateWeightToBeLost,
    calculateWeightToBeGained,
    calculateBodySurfaceArea,
    calculateMinMaxWeight,
    calculateDailyWaterNeed,
    calculateDailyProteinNeed,
    calculateDailyCalorieNeed,
    calculateDailyCarbohydrateNeed,
    login,
};