import { useRef } from "react";
import PropTypes from "prop-types";
import styles from "./UserComponent.module.css";
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';



const User = (props) => {
  const { user, deleteUser, editUser, saveUser, selectOne } = props;

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  return (
    <TableRow key={user.id} className={user.selected ? styles.selected : ""}>
      <TableCell>
        <label for={`check-${user.id}`}>
          <input
            id={`check-${user.id}`}
            type="checkbox"
            data={`${user.selected}`}
            onChange={() => selectOne(user.id)}
            checked={user.selected}
          ></input>
        </label>
      </TableCell>
      <TableCell>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="text"
          ref={nameRef}
          name="name"
          defaultValue={user.name}
        ></input>
      </TableCell>
      <TableCell>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="email"
          ref={emailRef}
          name="email"
          defaultValue={user.email}
        />
      </TableCell>
      <TableCell>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="text"
          ref={roleRef}
          name="role"
          defaultValue={user.role}
        />
      </TableCell>
      <TableCell style={{display:"flex", justifyContent:"space-between", width:"50px" }}>
        {user.edit ? (
          <div>
            <i
              onClick={() => saveUser(user.id, nameRef, emailRef, roleRef)}
              className="fas fa-save"
            ></i>
          </div>

          // <div>
          //   <span><i className="far fa-edit" style={{ width: "18px", }}></i></span>
          // </div>

        ) : (
          <div>
            <i onClick={() => editUser(user.id)} className="fas fa-edit"></i>
          </div>

        )}
        <div style={{color:"red"}}>
          <i onClick={() => deleteUser(user.id)} className="fas fa-trash-alt"></i>
        </div>

      </TableCell>
    </TableRow>
  );
};

User.propTypes = {
  user: PropTypes.object,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectOne: PropTypes.func
};

export default User;
