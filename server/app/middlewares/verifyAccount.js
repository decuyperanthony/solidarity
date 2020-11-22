// ce middleware va tester si l'utilisateur est déjà connecté
const loginMiddleware = (req, res, next) => {
    // si l'utilisateur est connecté, son "username" devrait être dans la session 
  
    // donc on teste cette présence, SAUF pour la page /login
    // bah oui, si je n'autorise pas les utilisateurs non connectés à se connecter.....
    if (req.session.username || req.url == '/login') {
      // si j'ai bien un utilisateur connecté.... je passe à la suite !
      const nickname = req.session.username;
      dataMapper.checkName(nickname, (error, data) => {
          if (error) {
              console.trace(error);
              return res.status(401).send('Veuillez activez votre email');
          }
          const user = data.rows[0];
          if (user.status === 'activé') {
              next();
          }
      });
    } else {
    // ICI, je n'ai pas d'utilisateur connecté => on redirige vers la page de login
    res.status(401).send('Veuillez activez votre email');
}

};

module.exports = loginMiddleware;