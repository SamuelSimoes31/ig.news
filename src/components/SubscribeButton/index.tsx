import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data ,status } = useSession();
  const router = useRouter();
  async function handleSubscribe() {
    if (status === 'unauthenticated') {
      signIn('github');
    } else if (status === 'authenticated') {
      if(data.activeSubscription){
        router.push('/posts');
      } else {
        try {
          const response = await api.post("/subscribe");
          const { sessionId } = response.data;
          const stripe = await getStripeJs();
          await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
          alert(error.message);
        }
      }

    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={() => handleSubscribe()}
    >
      Subscribe now
    </button>
  );
}