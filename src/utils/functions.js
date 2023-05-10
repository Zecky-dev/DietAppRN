// Vücut kitle indexi
const calculateBMI = (user) => {
    // Kilo / Boy^2 = BMI
    const heightMeterSquare = Math.pow(user.height / 10, 2);
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
            ? user.weight - calculateIdealWeight(user).value
            : "--")
    return { unit: (controlStatement?"kg":""), value };
}

//alınması gereken kilo
const calculateWeightToBeGained = (user) => {
    const controlStatement = calculateIdealWeight(user).value - user.weight > 0
    const value = (
        controlStatement
            ? calculateIdealWeight(user).value - user.weight
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
const minMaxWeightCalculate = (user) => {
    const { height } = user;
    const min = 18.5 * Math.pow(height / 100, 2).toFixed(2);
    const max = 24.9 * Math.pow(height / 100, 2).toFixed(2);
    const value = min.toString().concat(" -- ").concat(max.toString())
    return { value, unit: 'kg' }
}

export {
    calculateBMI,
    calculateIdealWeight,
    calculateWeightToBeLost,
    calculateWeightToBeGained,
    calculateBodySurfaceArea,
    minMaxWeightCalculate
};