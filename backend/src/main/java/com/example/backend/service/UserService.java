package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.dto.UserDTO;
import com.example.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;


    public UserDTO getUser(Integer id) {
        UserDTO userDTO = new UserDTO();
        try {
            Optional<User> optionalUser = userRepository.findById(id);

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                userDTO.setName(user.getName());
                userDTO.setSurname(user.getSurname());
                userDTO.setEmail(user.getEmail());
                userDTO.setId(user.getId());
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with id: " + id);
            }
        } catch (DataAccessException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Database error occurred while fetching user", e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error occurred while fetching user", e);
        }
        return userDTO;
    }

    public List<UserDTO> getAllUser() {
        try {
            List<User> allUsers = userRepository.findAll();

            return allUsers.stream()
                    .map(user -> {
                        UserDTO userDTO = new UserDTO();
                        userDTO.setName(user.getName());
                        userDTO.setSurname(user.getSurname());
                        userDTO.setEmail(user.getEmail());
                        userDTO.setId(user.getId());
                        return userDTO;
                    })
                    .collect(Collectors.toList());
        } catch (DataAccessException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Database error occurred while fetching all users", e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error occurred while fetching all users", e);
        }
    }

    public UserDTO createUser(UserDTO userDTO) {
        try {
            User existingUser = userRepository.findByEmail(userDTO.getEmail());
            if (existingUser != null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with the same email already exists");
            }

            User user = new User();
            user.setName(userDTO.getName());
            user.setSurname(userDTO.getSurname());
            user.setEmail(userDTO.getEmail());

            userRepository.save(user);

            userDTO.setId(user.getId());

            return userDTO;
        } catch (DataAccessException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Database error occurred while creating user", e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error occurred while creating user", e);
        }
    }


    public UserDTO updateUser(Integer id, UserDTO userDTO) {
        try {
            Optional<User> optionalUser = userRepository.findById(id);

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();

                if (!user.getEmail().equals(userDTO.getEmail())) {
                    User existingUser = userRepository.findByEmail(userDTO.getEmail());
                    if (existingUser != null) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with the same email already exists");
                    }
                }
                user.setName(userDTO.getName());
                user.setSurname(userDTO.getSurname());
                user.setEmail(userDTO.getEmail());

                userRepository.save(user);

                userDTO.setId(user.getId());
                return userDTO;
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with id: " + id);
            }
        } catch (DataAccessException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Database error occurred while updating user", e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error occurred while updating user", e);
        }
    }


    public void deleteUser(Integer id) {
        try {
            if (userRepository.existsById(id)) {
                userRepository.deleteById(id);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with id: " + id);
            }
        } catch (DataAccessException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Database error occurred while deleting user", e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error occurred while deleting user", e);
        }
    }
}

