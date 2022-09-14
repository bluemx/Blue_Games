using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.Runtime.InteropServices;

public class Botones : MonoBehaviour
{
    [SerializeField]GameObject pantalla1, pantalla2;

    [DllImport("__Internal")]
    private static extern void EnviarMsj(string str);


    private void Start()
    {
        EnviarMsj("gameopen");
    }


    private IEnumerator WaitForSceneLoad()
    {
        yield return new WaitForSeconds(0.5f);
        SceneManager.LoadScene("Principal");

    }


    public void CargarEscena()
    {

        EnviarMsj("btn_comenzar");
        GetComponent<AudioSource>().Play();
        
        StartCoroutine("WaitForSceneLoad");
    }

    public void SiguientePantalla()
    {
        EnviarMsj("btn_siguiente1");
        GetComponent<AudioSource>().Play();
        pantalla2.SetActive(true);
        pantalla1.SetActive(false);
    }

    public void RegresaPantalla()
    {
        if (pantalla1.activeInHierarchy)
        {

            EnviarMsj("btn_gameclose");
        }
        else if (pantalla2.activeInHierarchy)
        {
            EnviarMsj("btn_back");
            pantalla1.SetActive(true);
            pantalla2.SetActive(false);
        }
        
    }
}
