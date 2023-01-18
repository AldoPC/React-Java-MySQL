package com.bim.technical.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bim.technical.models.Address;

public interface AddressRepository extends JpaRepository<Address, Long>{
	

}
