import auth from '@react-native-firebase/auth'
import getFirebaseAuthErrorMessage from './firebaseErrorMessage';
import {showMessage} from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';

// CRUD işlemleri

const login = (email,password) => {
    
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const validatePassword = (password) => {
        const regex = /^[^\s]{8,16}$/;
        return regex.test(password);
    }


    if(validateEmail(email) && validatePassword(password)) {
        auth()
        .signInWithEmailAndPassword(email,password)
        .then(() => {
            setUserLoggedIn(true);
        })
        .catch((err) => {
        showMessage({
            message: getFirebaseAuthErrorMessage(err.code),
            type: "warning",
        })
        });
    }

    else {
        showMessage({
            message: "E-posta veya şifrede hata var.",
            type: "warning"
        })
    }
}

const register = (credits,setLoading) => {
    const {email,password} = credits;
    const username = credits.email.substring(0,credits.email.indexOf('@'));
    /* Kullanıcı bilgilerini firestore'a kaydetme işlemi */
    setLoading(true);
    firestore()
        .collection('Users')
        .doc(username)
        .set({
            name: credits.name,
            surname: credits.surname,
            email: credits.email,
            gender: credits.gender,
            age: credits.age,
            height: credits.height,
            weight: credits.weight,
            waistCircum: credits.waistCircum,
            hipCircum: credits.hipCircum,
            neckCircum: credits.neckCircum,
            movementFrequency: credits.movementFrequency,
        })
        .then(
            () => {
                // Veriler eklendikten sonra kayıt işlemi
                auth()
                    .createUserWithEmailAndPassword(email,password)
                    .then(() => {
                        setUserLoggedIn(true);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        )
        .catch((storageError) => console.log(storageError))
}

const update = (credits,navigation) => {
    const email = auth().currentUser.email;
    const username = email.substring(0, email.indexOf('@'));
    /* Kullanıcı bilgilerini firestore'a kaydetme işlemi */
    firestore()
        .collection('Users')
        .doc(username)
        .set({
            name: credits.name,
            surname: credits.surname,
            gender: credits.gender,
            age: credits.age,
            height: credits.height,
            weight: credits.weight,
            waistCircum: credits.waistCircum,
            hipCircum: credits.hipCircum,
            neckCircum: credits.neckCircum,
            movementFrequency: credits.movementFrequency,
        })
        .then(
            () => navigation.goBack()
        )
        .catch((storageError) => console.log(storageError))
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
    login,
    register,
    update
};