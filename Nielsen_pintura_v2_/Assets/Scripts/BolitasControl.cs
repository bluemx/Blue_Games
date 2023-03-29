using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class BolitasControl : MonoBehaviour
{
    [SerializeField] CircleCollider2D[] colliders;
    [SerializeField] GameObject temp;
    [SerializeField] int miPuntaje;
    [SerializeField] AudioClip audio;
    bool snap = false;
    Manager manager;
    ManagerBolitas managerB;
    bool piso;
    MeElimino [] activaBandera;
    public DestruirBolitas padreDestruye;
    
    ///MOVIMIENTO BOLITA
    
    public float force = 5;
    //int contadorRebote = 0;
    [SerializeField] BotePintua cubeta;
    Transform pos;

    public TextMeshProUGUI text;

    public void Awake()
    {
        cubeta = FindObjectOfType<BotePintua>();
        manager = FindObjectOfType<Manager>();
        managerB = FindObjectOfType<ManagerBolitas>();
        activaBandera = FindObjectsOfType<MeElimino>();
        padreDestruye= FindObjectOfType<DestruirBolitas>();
        
    }

    // Start is called before the first frame update
    void Start()
    {
        if(transform.parent.gameObject.layer!=8)
        {
            colliders = GetComponents<CircleCollider2D>();

            pos = cubeta.transform.GetChild(0).gameObject.transform.GetChild(0).gameObject.transform.GetChild(0).transform;

            //GetComponent<Rigidbody2D>().velocity = new Vector2(direction.x, direction.y).normalized * force;
            GetComponent<Rigidbody2D>().AddForce(force * (pos.up).normalized * 100);
        }
    }

    // Update is called once per frame
    void Update()
    {
       

        if (piso)
        {
            DesactivarColliders();
            gameObject.GetComponent<Animator>().Play("Explota");
        }

        if(transform.parent.gameObject.layer==8)
        {
            GetComponent<Rigidbody2D>().bodyType = RigidbodyType2D.Static;
            //DesactivarColliders();
        }

        if(snap)
        {
            Snap();
            
            snap = false;
        }

        if (manager.contador <= 0)
        {
            GetComponent<Rigidbody2D>().bodyType = RigidbodyType2D.Kinematic;
            transform.GetChild(0).gameObject.SetActive(false);
            managerB.Fin();
        }


        if(transform.parent.gameObject.layer==8)
        {
            transform.localPosition = new Vector3(0, 0, 0);
        }

        //text.text = transform.localPosition.ToString();
    }

    void Snap()
    {
        //transform.position = temp.transform.position;
        transform.SetParent(temp.transform,false);
        transform.localPosition = new Vector3(0, 0, 0);
        //transform.localRotation = new Quaternion(0, 0, 0,transform.localRotation.w);
        
        managerB.banderas = false;

        foreach (MeElimino item in activaBandera)
        {
            item.bandera=false;
        }



        //DesactivarColliders();
        
    }

    void DesactivarColliders()
    {
        for (int i = 0; i < colliders.Length; i++)
        {
            colliders[i].enabled = false;
        }
    }

    public void Destruir()
    {
        foreach (MeElimino item in activaBandera)
        {
            item.bandera = false;
        }

        //sumar puntos
        if (manager.contador > 0f && !piso)
        {
            manager.ActualizarPuntos(false, miPuntaje, audio);
        }



        //Destroy(gameObject);

        transform.SetParent(padreDestruye.transform);
        gameObject.SetActive(false);
        managerB.Limpiando();
        Destroy(gameObject);
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if(collision.gameObject.layer==8)
        {
            temp = collision.gameObject;

            if (temp.transform.childCount == 0)
            {
                if (temp.tag == "techo")
                {
                    snap = true;
                }
                else
                {
                    foreach (GameObject item in temp.GetComponent<Vecinos>().vecinosActivos)
                    {
                        if (item.transform.childCount > 0)
                        {
                            
                            
                            snap = true;
                            break;
                        }
                        else
                            snap = false;
                    }
                }
                
                
            }
            
        }

        if(collision.gameObject.name=="Piso")
        {
            piso = true;
        }
    }
}
