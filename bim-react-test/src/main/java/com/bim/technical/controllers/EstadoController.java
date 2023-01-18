package com.bim.technical.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bim.technical.models.Estado;
import com.bim.technical.repository.EstadoRepository;


@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")

public class EstadoController {
	
	@Autowired
	EstadoRepository estadoRepository;
	
	@GetMapping("/estados")
	  public ResponseEntity<List<Estado>> getAllEstados() {
	    try {
	      List<Estado> estados = new ArrayList<Estado>();
	      estadoRepository.findAll().forEach(estados::add);

	      if (estados.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	      }

	      return new ResponseEntity<>(estados, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
}
