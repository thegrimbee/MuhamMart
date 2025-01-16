import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useFirestore } from '../contexts/FirestoreContext';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../components/Header';
import theme from '../theme.js';
import { ThemeProvider } from '@emotion/react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { usersCollection } = useFirestore();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.roleRank <= 0) {
      navigate('/'); // Redirect to home page if user is not authorized
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(usersCollection);
        const usersList = [];
        snapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, [usersCollection]);

  const handleDelete = async (userId) => {
    try {
      await deleteDoc(doc(usersCollection, userId));
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const filteredUsers = users.filter((u) => u.roleRank < user.roleRank);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="md">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Manage Users
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role Rank</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.roleRank}</TableCell>
                    <TableCell align="right">
                      <IconButton color="error" onClick={() => handleDelete(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Users;