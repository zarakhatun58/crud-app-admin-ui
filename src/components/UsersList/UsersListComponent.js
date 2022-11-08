import PropTypes from "prop-types";
import { useEffect } from "react";
import User from "../UserComponent/UserComponent";
import config from "../../constants";
import styles from "./UsersListComponent.module.css";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const UsersList = (props) => {
  const {
    users,
    deleteUser,
    editUser,
    saveUser,
    selectAll,
    selectOne,
    selectAllRef,
    setPage,
    page,
  } = props;
  useEffect(() => {
    if (users.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage, users.length]);
  let fillRows = [];
  for (
    let i = users.filter((user) => user.show).length;
    i < config.PAGE_SIZE;
    i++
  ) {
    fillRows.push(<TableRow key={i}></TableRow>);
  }

  if (users.length === 0 && page === 1) {
    return <div>NO USERS IN THE SYSTEM</div>;
  }
  return (
    <Grid>
      <TableContainer>
        <Table className={styles.table}>
          <TableHead >
            <TableRow>
              <TableCell>
                <input
                  type="checkbox"
                  ref={selectAllRef}
                  onChange={(e) => {
                    selectAll(e);
                  }}
                  name="selectAll"
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return user.show ? (
                <User
                  selectOne={selectOne}
                  saveUser={saveUser}
                  editUser={editUser}
                  deleteUser={deleteUser}
                  key={user.id}
                  user={user}
                ></User>
              ) : (
                ""
              );
            })}
            {fillRows}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>

  );
};

UsersList.propTypes = {
  users: PropTypes.array,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectAll: PropTypes.func,
  selectOne: PropTypes.func,
  selectAllRef: PropTypes.object,
  setPage: PropTypes.func,
  page: PropTypes.number,
};

export default UsersList;
