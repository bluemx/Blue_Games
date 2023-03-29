using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ManagerBolitas : MonoBehaviour
{
    [SerializeField] List<GameObject> posiciones;
    [SerializeField] List<GameObject> azul, amar, rojo, mora;
    [SerializeField] List<GameObject> azulTemp, amarTemp, rojoTemp, moraTemp;
    [SerializeField] Grafo grafo;
    public bool banderas=false;
    //public int color;
    // Start is called before the first frame update
    void Start()
    {
        azul = new List<GameObject>();
        amar = new List<GameObject>();
        rojo = new List<GameObject>();
        mora = new List<GameObject>();

        azulTemp = new List<GameObject>();
        amarTemp = new List<GameObject>();
        rojoTemp = new List<GameObject>();
        moraTemp = new List<GameObject>();

        grafo = FindObjectOfType<Grafo>();
    }

    // Update is called once per frame
    void Update()
    {

        //Buscar();
        //Depuracion();

        if (!banderas)
        {
            //Debug.Log("banderas false");
            StartCoroutine("Procesos");

            //banderas = true;
        }
    }


    public void Proceso()
    {
        StartCoroutine("Procesos");
    }

    IEnumerator Procesos()
    {
        Debug.Log("procesos");
        Buscar();
        Depuracion();

        yield return new WaitForSeconds(0.01f);
        //banderas = true;
    }


    public void Fin()
    {
        foreach (GameObject item in posiciones)
        {
            if(item.transform.childCount>0)
            {
                item.transform.GetChild(0).GetComponent<Animator>().Play("Explota");
            }
        }
    }


    public void Buscar()//Busca dentro de las posiciones cuales bolitas hay de cada color
    {

        
        foreach (GameObject a in posiciones)
        {
            if(a.transform.childCount>0)
            {
                switch(a.transform.GetChild(0).tag)
                {
                    case "azul":
                        if(!azul.Contains(a))
                        {
                            azul.Add(a);
                        }
                        break;
                    case "amar":
                        if (!amar.Contains(a))
                        {
                            amar.Add(a);
                        }
                        break;
                    case "rojo":
                        if (!rojo.Contains(a))
                        {
                            rojo.Add(a);
                        }
                        break;
                    case "mora":
                        if (!mora.Contains(a))
                        {
                            mora.Add(a);
                        }
                        break;
                }
            }
        }

        //Depuracion(color);
    }
    void DepurarGrupos(List<GameObject>colores, List<GameObject>temp)//Revisa por cada color cuantas estan juntas
    {
       
        for (int i = 0; i < colores.Count; )
        {
            if(colores[i].GetComponent<Vecinos>().vecinos.Count>=2)
            {


                

                if (!temp.Contains(colores[i]))
                {
                    temp.Add(colores[i]);

                }

                for (int j = 0;j < colores[i].GetComponent<Vecinos>().vecinos.Count; j++)
                {

                    if (temp.Contains(colores[i]) && !temp.Contains(colores[i].GetComponent<Vecinos>().vecinos[j]))
                    {

                        temp.Add(colores[i].GetComponent<Vecinos>().vecinos[j]);

                    }
                }

                i++;

                break;
                
            }
            if (colores[i].GetComponent<Vecinos>().vecinos.Count == 1)
            {

                

                if (colores[i].GetComponent<Vecinos>().vecinos.Count > 1)
                {
                    if(temp.Count==0)
                    {
                        temp.Add(colores[i]);
                        i++;
                    }
                    else
                    {
                        if (!temp.Contains(colores[i]))
                        {
                            
                            temp.Add(colores[i]);
                            i++;
                        }
                        else
                            i++;
                    }
                    
                }
                else 
                {
                    if (colores[i].GetComponent<Vecinos>().vecinos[0].GetComponent<Vecinos>().vecinos.Count > 1)
                    {
                        
                        if (!temp.Contains(colores[i]))
                        {
                            
                            temp.Add(colores[i]);
                            i++;
                        }
                        else
                            i++;
                    }
                    else
                        i++;

                }
                   
            }
            else
                i++;
        }

        

    }
    void Eliminar(List<GameObject>bolitas, List<GameObject>colores)//recibe las listas temporales
    {
        colores.Clear();
        colores = new List<GameObject>();


        if (bolitas.Count >=3)
        {
            foreach (GameObject a in bolitas)
            {

                if (a.transform.childCount > 0)
                    a.transform.GetChild(0).GetComponent<Animator>().Play("Explota");
               
                
            }


            
        }
        else
        {
            // Debug.Log("no hay hijos");
        }

        Limpiar(bolitas);

    }

    public void LimpiarLista(string miColor)
    {
        //switch(miColor)
        //{
        //    case "Azul 01":
        //        Limpiar(azulTemp);
        //        break;
        //    case "Amarillo 1":
        //        Limpiar(amarTemp);
        //        break;
        //    case "Rojo 01":
        //        Limpiar(rojoTemp);
        //        break;
        //    case "Morado 01":
        //        Limpiar(moraTemp);
        //        break;
        //}
    }

    public void Limpiando()
    {
        Limpiar(azulTemp);
        Limpiar(rojoTemp);
        Limpiar(amarTemp);
        Limpiar(moraTemp);
    }

    void Limpiar(List<GameObject> temp)
    {
        //grafo.Proceso();
        
        temp.Clear();
        temp = new List<GameObject>();
    }

    void Depuracion()
    {

       

        DepurarGrupos(azul, azulTemp);
        Eliminar(azulTemp, azul);
        

        DepurarGrupos(amar, amarTemp);
        Eliminar(amarTemp, amar);

        

        DepurarGrupos(rojo, rojoTemp);
        Eliminar(rojoTemp, rojo);

        

        DepurarGrupos(mora, moraTemp);
        Eliminar(moraTemp, mora);


        
        //switch (bolitaColor)
        //{
        //    //Azul
        //    case 0:
        //        DepurarGrupos(azul, azulTemp);
        //        Eliminar(azulTemp, azul);

        //        Limpiar(azulTemp);

        //        break;
        //    //amarillo
        //    case 1:
        //        DepurarGrupos(amar, amarTemp);
        //        Eliminar(amarTemp, amar);

        //        Limpiar(amarTemp);
        //        break;
        //    //rojo
        //    case 2:
        //        DepurarGrupos(rojo, rojoTemp);
        //        Eliminar(rojoTemp, rojo);

        //        Limpiar(rojoTemp);

        //        break;
        //    //morado
        //    case 3:
        //        DepurarGrupos(mora, moraTemp);
        //        Eliminar(moraTemp, mora);


        //        Limpiar(moraTemp);
        //        break;
        //}

        //Buscar();

        
    }
}
