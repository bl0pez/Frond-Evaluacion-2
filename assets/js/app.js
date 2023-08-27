const form = document.querySelector('#form');
const inputs = document.querySelectorAll('#form input');

const nameCell = document.querySelector('#nameCell');
const ageCell = document.querySelector('#ageCell');
const nailsQuantity = document.querySelector('#nailsQuantity');
const nailsTotal = document.querySelector('#nailsTotal');
const boltsQuantity = document.querySelector('#boltsQuantity');
const boltsTotal = document.querySelector('#boltsTotal');
const nutsQuantity = document.querySelector('#nutsQuantity');
const nutsTotal = document.querySelector('#nutsTotal');
const quantity = document.querySelector('#quantity');
const total = document.querySelector('#total');

const validateNumericField = (value, maxValue) => {
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue >= 0 && numericValue <= maxValue;
}

const objFormValidation = {
    name: {
        validation: (value) => {
            return value.length >= 3
        },
        message: 'Ingrese al menos 3 caracteres'
    },
    age: {
        validation: (value) => value >= 18,
        message: 'Ingrese un numero mayor o igual a 18'
    },
    nails: {
        validation: (value) => validateNumericField(value, 200),
        message: 'Ingrese un numero menor o igual a 200'
    },
    bolts: {
        validation: (value) => validateNumericField(value, 150),
        message: 'Ingrese un numero mayor o igual a 0'
    },
    nuts: {
        validation: (value) => validateNumericField(value, 150),
        message: 'Ingrese un numero menor o igual a 150'
    }
}

const validateField = ({ name, value }) => {
    const error = document.querySelector(`#${name}Help`);
    if (!objFormValidation[name].validation(value)) {
        error.innerHTML = objFormValidation[name].message;
        form[name].classList.add('is-invalid');
        return;
    };
    form[name].classList.remove('is-invalid');
    form[name].classList.add('is-valid');
    error.innerHTML = '';
}

inputs.forEach((input) => {

    input.addEventListener('keyup', function ({ target }) {
        validateField(target);
    });

    input.addEventListener('blur', function ({ target }) {
        validateField(target);
    });
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let errors = false;

    inputs.forEach((input) => {
        validateField(input);
        if (input.classList.contains('is-invalid')) {
            return errors = true;
        }
    });

    if (errors) return;

    updateHtml();
    window.location.href = '#paymentStatus';

});

const updateHtml = () => {
    const totalNails = (50 * form.nails.value);
    const totalBolts = (150 * form.bolts.value);
    const totalNuts = (150 * form.nuts.value);

    nameCell.innerHTML = form.name.value;
    ageCell.innerHTML = form.age.value;
    nailsQuantity.innerHTML = form.nails.value;
    nailsTotal.innerHTML = `$${totalNails}`;
    boltsQuantity.innerHTML = form.bolts.value;
    boltsTotal.innerHTML = `$${totalBolts}`;
    nutsQuantity.innerHTML = form.nuts.value;
    nutsTotal.innerHTML = `$${totalNuts}`;
    quantity.innerHTML = parseInt(form.nails.value) + parseInt(form.bolts.value) + parseInt(form.nuts.value);
    total.innerHTML = `$ ${totalNails + totalBolts + totalNuts}`;
}