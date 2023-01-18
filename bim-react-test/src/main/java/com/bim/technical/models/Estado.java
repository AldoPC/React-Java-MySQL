package com.bim.technical.models;

import javax.persistence.*;

@Entity
@Table(name = "estados")
public class Estado {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "nombre")
	private String nombre;

	@Column(name = "pais")
	private long pais;


	public Estado() {

	}

	public Estado(String nombre, long pais) {
		this.nombre = nombre;
		this.pais = pais;
	}

	public long getId() {
		return id;
	}

	public long getPais() {
		return pais;
	}

	public void setPais(long estado) {
		this.pais = estado;
	}


	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	@Override
	public String toString() {
		return "Tutorial [id=" + id + ", pais=" + pais + ", nombre=" + nombre + "]";
	}
}
