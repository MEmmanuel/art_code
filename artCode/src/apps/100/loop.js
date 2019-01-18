var body = document.getElementsByTagName('body')[0];

const req = new XMLHttpRequest();
req.open('GET', 'https://www.instagram.com/_art_code_/', false);
req.send(null);

var followersCount = 136;
if (req.status === 200) {
  followersCount = JSON.parse(req.responseText.split('window._sharedData = ')[1].split(';</script>')[0]).entry_data.ProfilePage[0].graphql.user.edge_followed_by.count;
}

var controller = new Controller(body, window, followersCount);

// document.body.onmousemove = controller.move;
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
    controller.move(e);
}, false);

// document.body.onclick = function (e) {controller.click(e)};
document.addEventListener('click', function(e) {
    e.preventDefault();
    controller.click(e);
}, false);

setInterval(function () {
    controller.render();
}, RENDER_DELAY);
