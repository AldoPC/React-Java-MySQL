package com.bim.technical.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bim.technical.models.AddressParse;

public interface AddressParseRepository extends JpaRepository<AddressParse, Long>{
	
	@Query(value = "SELECT a.id, a.cp, e.nombre estado, m.nombre municipio FROM address a LEFT JOIN estados e ON e.id = a.estado LEFT JOIN municipios m ON m.id = a.municipio", nativeQuery=true)
	List<AddressParse> findAllParse();

}
