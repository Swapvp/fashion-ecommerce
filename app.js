// mobile responsive navbar

const sidebar = document.querySelector('.sidebar')
const btn = document.querySelector('.mobile-menu')

btn.addEventListener('click', ()=> {
    sidebar.classList.toggle('hide')
})

