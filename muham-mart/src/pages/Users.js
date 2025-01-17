import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { getDocs, updateDoc, deleteDoc, doc, addDoc, collection, getFirestore, writeBatch } from 'firebase/firestore';
import { useFirestore } from '../contexts/FirestoreContext';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../components/Header';
import theme from '../theme.js';
import { ThemeProvider } from '@emotion/react';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [voucherAmount, setVoucherAmount] = useState('');
  const [reason, setReason] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const { usersCollection } = useFirestore();
  const { user } = useUser();
  const firestore = getFirestore();
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
  const handleAddVoucherClick = () => {
    setOpen(true);
  };

  const handleVoucherChange = (e) => {
    setVoucherAmount(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleUserSelection = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const handleVoucherSubmit = async () => {
    if (selectedUsers.length > 0 && voucherAmount && reason) {
      try {
        const batch = writeBatch(firestore);
        selectedUsers.forEach((userId) => {
          const userDoc = doc(usersCollection, userId);
          batch.update(userDoc, {
            vouchers: users.find((u) => u.id === userId).vouchers + parseInt(voucherAmount, 10)
          });
        });
        await batch.commit();

        await addDoc(collection(firestore, 'VoucherChanges'), {
          users: selectedUsers,
          amount: parseInt(voucherAmount, 10),
          reason,
          timestamp: new Date()
        });

        setUsers(users.map((u) =>
          selectedUsers.includes(u.id)
            ? { ...u, vouchers: u.vouchers + parseInt(voucherAmount, 10) }
            : u
        ));
        setOpen(false);
        setVoucherAmount('');
        setReason('');
        setSelectedUsers([]);
      } catch (error) {
        console.error("Error adding voucher: ", error);
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
    setVoucherAmount('');
    setReason('');
    setSelectedUsers([]);
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
          <Button variant="contained" color="primary" onClick={handleAddVoucherClick} sx={{ mb: 2 }}>
            Add Vouchers
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell><ConfirmationNumberIcon /></TableCell>
                  <TableCell>Role Rank</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.vouchers}</TableCell>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Vouchers</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the amount of vouchers to add, select users, and provide a reason for adding the vouchers.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Voucher Amount"
            type="number"
            fullWidth
            value={voucherAmount}
            onChange={handleVoucherChange}
          />
          <TextField
            margin="dense"
            label="Reason"
            type="text"
            fullWidth
            value={reason}
            onChange={handleReasonChange}
          />
          <FormGroup>
            {filteredUsers.map((user) => (
              <FormControlLabel
                key={user.id}
                control={
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleUserSelection(user.id)}
                  />
                }
                label={user.name}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleVoucherSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Users;