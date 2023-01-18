package com.bim.technical.models;

import javax.persistence.*;

@Entity
@Table(name = "municipios")
public class Municipio {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "nombre")
	private String nombre;

	@Column(name = "estado")
	private long estado;


	public Municipio() {

	}

	public Municipio(String nombre, long estado) {
		this.nombre = nombre;
		this.estado = estado;
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


	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	@Override
	public String toString() {
		return "Tutorial [id=" + id + ", estado=" + estado + ", nombre=" + nombre + "]";
	}
}
