import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, Save, User } from "lucide-react";
import { theme as C } from '@/theme';
import { Btn, PageHeader, FormField, Spinner } from '@/components/ui';
import { usersService } from '@/services/users.service';
import { ROLES } from '@/lib/constants';
import { toast } from 'react-hot-toast';

const userSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  prenom: z.string().min(2, 'Le prénom est requis'),
  email: z.string().email('Email invalide'),
  role: z.string().min(1, 'Le rôle est requis'),
  status: z.string().min(1, 'Le statut est requis'),
});

export default function UserFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => usersService.getById(id),
    enabled: isEdit,
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema),
    values: user || {
      nom: '',
      prenom: '',
      email: '',
      role: 'Administrateur',
      status: 'Actif',
    }
  });

  const mutation = useMutation({
    mutationFn: (data) => isEdit ? usersService.update(id, data) : usersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(isEdit ? 'Utilisateur mis à jour' : 'Utilisateur créé');
      navigate('/users');
    },
    onError: (error) => {
      toast.error(error.message || 'Une erreur est survenue');
    }
  });

  const onSubmit = (data) => mutation.mutate(data);

  if (isEdit && isLoading) return <Spinner />;

  return (
    <div>
      <div 
        onClick={() => navigate("/users")} 
        style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", marginBottom: 16 }}
      >
        <ChevronLeft size={16} color={C.primary} />
        <span style={{ fontSize: 13, color: C.primary, fontWeight: 600 }}>Retour aux utilisateurs</span>
      </div>

      <PageHeader 
        breadcrumb={`Utilisateurs / ${isEdit ? 'Édition' : 'Nouveau'}`} 
        title={isEdit ? `Modifier l'utilisateur ${user?.prenom}` : "Ajouter un Utilisateur"}
      />

      <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: 32, maxWidth: 800 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <FormField 
              label="Nom" 
              name="nom"
              register={register}
              error={errors.nom}
              placeholder="Ex: DIALLO" 
            />
            <FormField 
              label="Prénom" 
              name="prenom"
              register={register}
              error={errors.prenom}
              placeholder="Ex: Amadou" 
            />
          </div>

          <FormField 
            label="Adresse email" 
            name="email"
            register={register}
            error={errors.email}
            placeholder="amadou@autolink.tg" 
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <FormField 
              label="Rôle" 
              type="select"
              name="role"
              register={register}
              error={errors.role}
              options={Object.entries(ROLES).map(([_, v]) => ({ label: v, value: v }))}
            />
            <FormField 
              label="Statut" 
              type="select"
              name="status"
              register={register}
              error={errors.status}
              options={[
                { label: 'Actif', value: 'Actif' },
                { label: 'Inactif', value: 'Inactif' },
              ]}
            />
          </div>

          <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Btn outline onClick={() => navigate('/users')}>Annuler</Btn>
            <Btn primary type="submit" icon={Save} loading={mutation.isPending}>
              {isEdit ? 'Mettre à jour' : 'Enregistrer'}
            </Btn>
          </div>
        </form>
      </div>
    </div>
  );
}
