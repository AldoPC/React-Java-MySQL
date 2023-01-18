package com.bim.technical.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bim.technical.models.Address;
import com.bim.technical.models.AddressParse;
import com.bim.technical.repository.AddressParseRepository;
import com.bim.technical.repository.AddressRepository;



@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class AddressController {
	
	@Autowired
	AddressRepository addressRepository;
	
	@Autowired
	AddressParseRepository addressParseRepository;
	
	@GetMapping("/addresses")
	  public ResponseEntity<List<Address>> getAllAddresses() {
	    try {
	      List<Address> addresses = new ArrayList<Address>();

	    	  addressRepository.findAll().forEach(addresses::add);

	      if (addresses.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	      }

	      return new ResponseEntity<>(addresses, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	
	@GetMapping("/addressesParse")
	  public ResponseEntity<List<AddressParse>> getAllAddressesParsed() {
	    try {
	    
	    List<AddressParse> addressesParsed = new ArrayList<AddressParse>();
	    
	    addressParseRepository.findAllParse().forEach(addressesParsed::add);

	      if (addressesParsed.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	      }

	      return new ResponseEntity<>(addressesParsed, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	
	@GetMapping("/addresses/{id}")
	  public ResponseEntity<Address> getAddressById(@PathVariable("id") long id) {
	    Optional<Address> addressData = addressRepository.findById(id);

	    if (addressData.isPresent()) {
	      return new ResponseEntity<>(addressData.get(), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }
	
	@PostMapping("/addresses")
	  public ResponseEntity<Address> createAddress(@RequestBody Address address) {
	    try {
	    	Address _address = addressRepository
	          .save(new Address(address.getEstado(), address.getMunicipio(), address.getCP()));
	      return new ResponseEntity<>(_address, HttpStatus.CREATED);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	
	@PutMapping("/addresses/{id}")
	  public ResponseEntity<Address> updateAddress(@PathVariable("id") long id, @RequestBody Address address) {
	    Optional<Address> addressData = addressRepository.findById(id);

	    if (addressData.isPresent()) {
	    	Address _address = addressData.get();
	    	_address.setEstado(address.getEstado());
	    	_address.setMunicipio(address.getMunicipio());
	    	_address.setCP(address.getCP());
	      return new ResponseEntity<>(addressRepository.save(_address), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }
	
	@DeleteMapping("/addresses/{id}")
	  public ResponseEntity<HttpStatus> deleteAddress(@PathVariable("id") long id) {
	    try {
	      addressRepository.deleteById(id);
	      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	

}
