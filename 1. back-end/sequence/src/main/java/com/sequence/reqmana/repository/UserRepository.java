package com.sequence.reqmana.repository;

import com.sequence.reqmana.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{
}
