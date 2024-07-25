function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
function openPopup() {
  var popup = document.getElementById('popup');
  var overlay = document.getElementById('overlay');

  popup.style.display = 'block';
  overlay.style.display = 'block';
  document.body.classList.add('no-scroll');
}

function closePopup() {
  var popup = document.getElementById('popup');
  var overlay = document.getElementById('overlay');

  popup.style.display = 'none';
  overlay.style.display = 'none';
  document.body.classList.remove('no-scroll');
}
