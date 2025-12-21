let likes = localStorage.getItem("likesJaze") || 0;
document.getElementById("likes").textContent =
  "Likes: " + likes;

function likeJaze(){
  likes++;
  localStorage.setItem("likesJaze", likes);
  document.getElementById("likes").textContent =
    "Likes: " + likes;
}
