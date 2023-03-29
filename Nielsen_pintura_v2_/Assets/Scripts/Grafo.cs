using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Grafo : MonoBehaviour
{

    [SerializeField] List<Vecinos> posiciones;
    [SerializeField] List<Vecinos> nodos;
    [SerializeField] List<GameObject> nuevoCamino;


    // Start is called before the first frame update
    void Start()
    {
        nodos = new List<Vecinos>();
        nuevoCamino = new List<GameObject>();
    }

    // Update is called once per frame
    void Update()
    {

        if (Input.GetMouseButtonDown(0))
        {
            nuevoCamino.Clear();
            nodos.Clear();

            nodos = new List<Vecinos>();
            nuevoCamino = new List<GameObject>();
        }

        BuscarActivos();
        Proceso();
    }


    void BuscarActivos()
    {

        //foreach (Vecinos a in posiciones)
        //{
        //    if(a.gameObject.transform.childCount>0)
        //    {
        //        if(!nodos.Contains(a))
        //        {
        //            nodos.Add(a);
        //        }
        //    }
        //}

        for (int i = posiciones.Count-1; i > -1; i--)
        {
            if (posiciones[i].gameObject.transform.childCount > 0)
            {
                if (!nodos.Contains(posiciones[i]))
                {
                    nodos.Add(posiciones[i]);
                }
            }
        }


    }

    public void Proceso()
    {
        Debug.Log("Proceso");
        if (nodos.Count > 0)
        {
            BuscaCamino(nodos[0]);
            Continua();
        }

        //for (int i = 0; i < nodos.Count; i++)
        //{
        //    if(nodos[i].gameObject.tag!="techo")
        //    {
        //        BuscaCamino(nodos[i]);
        //        Continua();
        //    }
        //}
    }

    void BuscaCamino(Vecinos a)
    {
        int cuantos=0;
        bool limpiar = false;
        for (int i = 0; i < a.vecinosGrafo.Count; )
        {
            if (a.vecinosGrafo[i].transform.childCount > 0)
            {
                if (!nuevoCamino.Contains(a.vecinosGrafo[i]))
                {
                    nuevoCamino.Add(a.vecinosGrafo[i]);
                    i++;
                }
                
                else
                {
                    i++;
                    break;
                }
            }
            else
            {
                if (a.vecinosGrafo[i].gameObject.tag != "techo")
                {
                    cuantos++;
                    i++;
                }
                else
                {

                    Debug.Log("Estoy pegado al techo");
                    
                    limpiar = true;

                    

                    break;
                }

            }
                
        }

        if(cuantos==a.vecinosGrafo.Count-1)
        {
           
            Debug.Log(a.name + " estoy solito");
            //Se elimina y suma puntos
            foreach (GameObject item in nuevoCamino)
            {
                if (item.tag == "techo")
                {
                    limpiar = true;
                    break;
                }
                else
                {
                    if (item.transform.childCount > 0)
                    { 
                        item.transform.GetChild(0).GetComponent<Animator>().Play("Explota");
                        //nodos.Clear();

                        //nodos = new List<Vecinos>();
                    }
                    else
                    {
                        limpiar = true;
                        break;
                    }
                }

            }

           
            
            
        }


        if (limpiar)
        {
            //Debug.Log("Limpiar");
            nuevoCamino.Clear();
            nodos.Clear();

            nodos = new List<Vecinos>();
            nuevoCamino = new List<GameObject>();



            limpiar = false;
        }

    }

    void Continua()
    {
        if(nuevoCamino.Count>0)
        {
            for (int i = 0; i < nuevoCamino.Count; i++)
            {
                if (nuevoCamino[i].gameObject.tag != "techo")
                {
                    BuscaCamino(nuevoCamino[i].GetComponent<Vecinos>());
                }
                else
                    Debug.Log(nuevoCamino[i].name + "tengo vecino TECHO");
            }
        }
    }
   
}
