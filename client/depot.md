
regarder les paquets
- sanitize
- multer
- morgan
https://github.com/O-clock-Bifrost/okanban-SimonMARTIN87/blob/master/index.js <= server.js de Simon le kanban

pouvoir supprimer un compte user



// == test Max

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
// import { Icon, Label } from 'semantic-ui-react';
// import { DELETE_CATEGORY_LABEL } from '../../store/actions';


// const LabelCategory = ({ lessonId, teacherId }) => {
//   const dispatch = useDispatch();
//   const { lessonInfo, userId } = useSelector((state) => state);
//   const { categoryInfo } = lessonInfo;
//   if (categoryInfo === undefined) {
//     return null;
//   }

//   const categoryJSX = () => {
//     categoryInfo.map((category) => {
//       // == fct pour qui réagit au handleClick
//       const handleClick = (e) => {
//         const categoryId = e.target.getAttribute('data-key');
//         dispatch({
//           type: DELETE_CATEGORY_LABEL,
//           payload:
//            {
//              categoryId,
//              lessonId,
//            },
//         });
//       };
//       // == icone de la croix pour remove category
//       let iconJSX = '';
//       if (userId === teacherId) {
//         iconJSX = (
//           <Icon
//             onClick={handleClick}
//             name="delete"
//             key={category.category_id}
//             data-key={category.category_id}
//           />
//         );
//       }
//       return (
//         <Label image>
//           <img src="https://react.semantic-ui.com/images/avatar/small/ade.jpg" />
//           {category.name}
//           {iconJSX}
//         </Label>
//       );
//     });
//   };
//   useEffect(categoryJSX(), [categoryInfo]);
//   return (
//     <div>
//       {categoryJSX}
//     </div>
//   );
// };

// LabelCategory.propTypes = {
//   lessonId: PropTypes.number,
//   teacherId: PropTypes.number,
// };

// export default LabelCategory;



Session

```JS
// src/index.js
import React from 'react'; // couche 1
import { render } from 'react-dom'; // couche 2
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { enterHomePage } from 'src/store/actions';

// == Import : local
// Composants
import App from 'src/components/App';
import store from 'src/store';

const user = JSON.parse(sessionStorage.getItem('user'));
if (user) {
  store.dispatch(enterHomepage(user));
}

const rootReactElement = (
...
```

```JS
import axios from 'axios';
import { LOGIN, enterHomePgae } from 'src/store/actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      axios({
        method: 'post',
        url: 'http://localhost:3000/connection',
        data: action.values,
      })
        .then((res) => {
          if (res.status === 200) {
            sessionStorage.user = JSON.stringify(res.data);
            store.dispatch(enterHomePage(res.data));
          }
        });
      return;
    }

    default: {
      next(action);
    }
  }
};
```

```JS
// reducer.js
import {
  ENTER_HOME_PAGE,
  GET_USERS,
} from './actions';

const initialState = {
  user: {
    role: '',
    firstname: '',
    lastname: '',
    email: '',
    token: '',
  },
  staffMembers: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ENTER_OBOLE: {
      return {
        ...state,
        user: {
          role: action.values.role,
          firstname: action.values.firstname,
          lastname: action.values.lastname,
          email: action.values.email,
          token: action.values.token,
        },
      };
    }
...
```

pour remove le session/cookie
https://developer.mozilla.org/fr/docs/Web/API/Window/sessionStorage


SInon coté back
me faut une route logout dans ton serveur
Une requête get qui supprime le cookie

```JS
server​.​route​({
            method​:​ ​'​GET​'​,
            path​:​ ​'​/logout​'​,
            config​:​ {
                description​:​ ​'​Remove the authentification by cookie​'​,
                tags​:​ [​'​api​'​, ​'​logout​'​]
            },
            ​handler​:​ (​request​, ​h​) ​=>​ {

                ​//​ remove the cookie​
                ​request​.​cookieAuth​.​clear​();
                ​return​ ​h​.​redirect​(​'​/​'​);
            }
        });
```
coté back



```JS
  const user = useSelector((state) => state.user);


  if (!user) {
    const userInfo = JSON.parse(sessionStorage.getItem('user'));
    dispatch(getAuthentified(history, userInfo));
  }
```

// == slugify
import slugify from 'slugify';
  //! -----slugify-------------
  if (lessons === []) return null;
  lessons.map((lesson) => {
    const slugTitle = slugify(lesson.title).toLowerCase();
    return console.log('slugTitle', slugTitle);
  });
  //! -------------------------


{lessons.map((lesson) =>
          // const slugTitle = slugify(lesson.title).toLowerCase();
          (
            <Route
              key={lesson.id}
              exact
              path={`/lessons/${lesson.id}`}
              // path={`/lessons/${slugify(lesson.title).toLowerCase()}`}
              render={() => {
                if (!userToken) {
                  return <Redirect to="/login" />;
                }
                return <Room lesson={lesson} />;
              }}
            />
          ))}

