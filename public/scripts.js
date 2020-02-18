// const headerBtn = document.querySelector('header button');
// const form = document.querySelector('.form');


// headerBtn.addEventListener('click', () => {
//     form.a
// });

document
    .querySelector('header button')
    .addEventListener("click", () => {
        document
            .querySelector('.form')
            .classList.toggle('hide');
    });