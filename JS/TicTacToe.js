document.querySelectorAll('.add-players').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.target.style.setProperty('--glow-x', `${x}%`);
        e.target.style.setProperty('--glow-y', `${y}%`);
    });
    
    btn.addEventListener('mouseleave',function () {
        btn.style.setProperty('--glow-x', '50%');
        btn.style.setProperty('--glow-y', '50%');
    });
});

document.querySelectorAll(`.reset-btn`).forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.target.style.setProperty('--glow-x', `${x}%`);
        e.target.style.setProperty('--glow-y', `${y}%`);
    });
    
    btn.addEventListener('mouseleave',function () {
        btn.style.setProperty('--glow-x', '50%');
        btn.style.setProperty('--glow-y', '50%');
    });
});
document.querySelectorAll(`.new-player`).forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.target.style.setProperty('--glow-x', `${x}%`);
        e.target.style.setProperty('--glow-y', `${y}%`);
    });
    
    btn.addEventListener('mouseleave',function () {
        btn.style.setProperty('--glow-x', '50%');
        btn.style.setProperty('--glow-y', '50%');
    });
});

document.querySelectorAll(`.reset-score`).forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.target.style.setProperty('--glow-x', `${x}%`);
        e.target.style.setProperty('--glow-y', `${y}%`);
    });
    
    btn.addEventListener('mouseleave',function () {
        btn.style.setProperty('--glow-x', '50%');
        btn.style.setProperty('--glow-y', '50%');
    });
});

document.getElementById(`add-players-btn`).addEventListener(function (){
    const playerX = document.getElementById(`name-player-one`).value
    const playerO = document.getElementById(`name-player-two`).value
    
})