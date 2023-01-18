package com.bim.technical.models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class AddressParse {

	@Id
	private long id;

	private String estado;

	private String municipio;

	private String cp;
	
	public AddressParse() {

	}

	public AddressParse(String estado, String municipio, String cp) {
		this.estado = estado;
		this.municipio = municipio;
		this.cp = cp;
	}


	public long getId() {
		return id;
	}


	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	public String getMunicipio() {
		return municipio;
	}

	public void setMunicipio(String municipio) {
		this.municipio = municipio;
	}
	
	public void setCP(String cp) {
		this.cp = cp;
	}
	
	public String getCP() {
		return cp;
	}

	@Override
	public String toString() {
		return "Tutorial [id=" + id + ", estado=" + estado + ", municipio=" + municipio +  ", cp=" + cp + "]";
	}
}
