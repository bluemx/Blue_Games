using System.Collections;
using System.Collections.Generic;
using UnityEditor.PackageManager;
using UnityEngine;

public class BolitasSueltas : MonoBehaviour
{
    public List<GameObject> todos;
    public List<GameObject> vecinoActivo = new List<GameObject>();
    public bool bandera = false;
    public GameObject primero;
    public bool fin = true;
    
    // Start is called before the first frame update
    void Start()
    {
        todos = new List<GameObject>();
        int layerIndex = LayerMask.NameToLayer("Pos");
        GameObject[] objectsInLayer = GameObject.FindObjectsOfType<GameObject>();

        foreach (GameObject obj in objectsInLayer)
        {
            if (obj.layer == layerIndex)
            {
                todos.Add(obj);
            }
        }
        
    }

    // Update is called once per frame
    void Update()
    {
        
        if (fin)
        {
            StartCoroutine("Limpiar");
           
        }
        if (!bandera)
        {
            
            if(primero!=null)
            {
                BuscandoDentroVecinos(primero);
            }

            bandera = true;
        }
    }


   

    void Buscando() 
    {
        Debug.Log("BolitasSueltas:Buscando");
        if(todos.Count > 0) 
        {
            for (int i = todos.Count-1; i >= 0 ; i--)
            {
                if (todos[i].transform.childCount>0)
                {
                    if (todos[i].tag != "techo")
                    {
                        if (!vecinoActivo.Contains(todos[i]))
                        {
                            vecinoActivo.Add(todos[i]);
                            primero = todos[i];
                            BuscandoDentroVecinos(primero);
                        }
                    }
                    
                    
                }
            }
        }//fin if todos
        

    }

    IEnumerator Limpiar()
    {
        //Debug.Log("entre a fin");
        vecinoActivo.Clear();
        vecinoActivo = new List<GameObject>();
        //Debug.Log("lista vecinos activos: "+vecinoActivo.Count);
        primero = null;
        Buscando();
        fin = false;
        bandera = false;

        yield return new WaitForSeconds(0.5f);
    }

    void BuscandoDentroVecinos(GameObject yo)
    {
        //Debug.Log("Entre a Buscando Dentro de Vecinos");
        int contActivos=0;
        
        if (yo.tag != "techo")
        {
            for (int i = 0; i < yo.GetComponent<MeElimino>().vecinitosArriba.Count; i++)
            {
               
                if (yo.GetComponent<MeElimino>().vecinitosArriba[i].transform.childCount > 0)
                {
                   
                    if (!vecinoActivo.Contains(yo.GetComponent<MeElimino>().vecinitosArriba[i]))
                    {
                       
                        vecinoActivo.Add(yo.GetComponent<MeElimino>().vecinitosArriba[i]);
                       

                    }
                    
                    contActivos++;

                }
                
            }
            if (contActivos < 1 && yo.tag != "techo")
            {
                //Debug.Log("Me destruyo " +yo.name);

                //yo.GetComponent<MeElimino>().BYE();
                
                Lateral(yo);
                
            }
            else
            {
                for (int i = 0; i < yo.GetComponent<MeElimino>().vecinitosArriba.Count; i++)
                {
                    BuscandoDentroVecinos(yo.GetComponent<MeElimino>().vecinitosArriba[i]);
                }
            }
        }
        else
        {
            //Debug.Log("fin");
            fin = true;
        }
       
    }

    void Lateral(GameObject yo)
    {
        //Debug.Log("Entre a Lateral");
        int contActivos = 0;

        if (yo.tag != "techo")
        {
            for (int i = 0; i < yo.GetComponent<MeElimino>().vecinitosLaterales.Count; i++)
            {

                if (yo.GetComponent<MeElimino>().vecinitosLaterales[i].transform.childCount > 0)
                {

                    if (!vecinoActivo.Contains(yo.GetComponent<MeElimino>().vecinitosLaterales[i]))
                    {

                        vecinoActivo.Add(yo.GetComponent<MeElimino>().vecinitosLaterales[i]);


                    }

                    contActivos++;

                }

            }
            if (contActivos < 1 && yo.tag != "techo")
            {
                //Debug.Log("Me destruyo " + yo.name);

                yo.GetComponent<MeElimino>().BYE();
                

            }
            else
            {
                for (int i = 0; i < yo.GetComponent<MeElimino>().vecinitosLaterales.Count; i++)
                {
                    BuscandoDentroVecinos(yo.GetComponent<MeElimino>().vecinitosLaterales[i]);
                }
            }
        }
        else
        {
            //Debug.Log("fin");
           
            fin = true;
        }
    }
}
