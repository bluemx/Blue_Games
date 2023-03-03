using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Spawner : MonoBehaviour
{
    public GameObject[] piezas;
    public Transform[] posiciones;
    public float time = 4f;
    public AudioClip sonido;
    public AudioSource a;

    [SerializeField] Manager manager;

    void Start()
    {
        StartCoroutine("Piezas");
    }

    IEnumerator Piezas()
    {
        while (true)
        {
            if (manager.contador > 0)
            {
                GameObject bubble = Instantiate(piezas[Random.Range(0, piezas.Length)], posiciones[Random.Range(0, posiciones.Length)]);
                bubble.transform.SetParent(this.transform);
                float s = Random.Range(0.5f, 1f);
                bubble.transform.localScale = new Vector3(s,s,1);
                a.clip = sonido;
                a.Play();


                Destroy(bubble, 10f);

            }





            yield return new WaitForSeconds(time);
        }

    }
}
