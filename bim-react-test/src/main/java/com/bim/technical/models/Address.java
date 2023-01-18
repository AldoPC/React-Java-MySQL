package com.bim.technical.models;

import javax.persistence.*;

@Entity
@Table(name = "address")
public class Address {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "estado")
	private long estado;

	@Column(name = "municipio")
	private long municipio;

	@Column(name = "cp")
	private String cp;

	public Address() {

	}

	public Address(long estado, long municipio, String cp) {
		this.estado = estado;
		this.municipio = municipio;
		this.cp = cp;
	}

	public long getId() {
		return id;
	}

	public long getEstado() {
		return estado;
	}

	public void setEstado(long estado) {
		this.estado = estado;
	}

	public long getMunicipio() {
		return municipio;
	}

	public void setMunicipio(long municipio) {
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
		return "Tutorial [id=" + id + ", estado=" + estado + ", municipio=" + municipio + ", estado=" + estado + ", municipio=" + municipio + ", cp=" + cp + "]";
	}
}
