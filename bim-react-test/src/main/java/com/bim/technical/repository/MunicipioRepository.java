package com.bim.technical.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bim.technical.models.Municipio;

public interface MunicipioRepository extends JpaRepository<Municipio, Long>{
	
	List<Municipio> findByEstado(long estado);

}
