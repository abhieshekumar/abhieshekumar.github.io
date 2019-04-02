function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();
  return rect.bottom > 0 &&
      rect.right > 0 &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
      rect.top < (window.innerHeight || document.documentElement.clientHeight)
}

const about = document.querySelector('.centered')
const interestitem = document.querySelectorAll('#interests li')
let aboutAnimated = 0
let interestItemAnimated = 0

function handleAnimate(){
  if(!aboutAnimated && isElementInViewport(about)) {
    about.classList.add('animated','fadeIn','fast','delay-1s')
    aboutAnimated++
    about.addEventListener('animationend', function() {
      about.classList.remove('animated','fadeIn','fast')
    })
  }
  interestitem.forEach(function(item,index){
    if(index<=interestItemAnimated && isElementInViewport(item,index)) {
      item.classList.add('animated','slideInUp',`delay-${index}`,'faster')
      interestItemAnimated++
      item.addEventListener('animationend', function(){
        about.classList.remove('animated','slideInUp',`delay-${index}`,'faster')
      })
    }
  })
}

window.addEventListener('scroll', handleAnimate)

function setUpdate(){
  
  firebase.initializeApp({
    apiKey: 'AIzaSyAxauYU2ImqqETAodSzwL_nrtJh7oalwZM',
    authDomain: 'website-counter-abhieshekumar.firebaseapp.com',
    projectId: 'website-counter-abhieshekumar'
  })
  const db = firebase.firestore()
  firebase.auth().signInAnonymously()
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      db.collection('abhieshekumar.github.io').doc('counter').get().then(function(doc){
        let num = doc.data().count
        document.querySelector('#count').innerHTML += `${(num+1)} views`
        db.collection('abhieshekumar.github.io').doc('counter').set({
          count: num+1
        })
      })
    }
  })
}
